/* EcoFootprint — app.js
   Tres capas: Calc (cálculos puros), Store (persistencia local) y UI (DOM). */
'use strict';

/* ---------- 1. CÁLCULOS (sin acceso al DOM) ---------- */
const Calc = {
  KG_ARBOL_ANIO: 21,   // aproximación ilustrativa
  KG_POR_KM: 0.17,     // aproximación ilustrativa

  /** Reglas de validación por campo. */
  reglas: {
    personas:   { min: 1, entero: true, msg: 'Indica al menos 1 persona (número entero).' },
    kwh:        { min: 0, msg: 'Ingresa un consumo de 0 kWh o más.' },
    factorElec: { min: 0, msg: 'El factor debe ser 0 o mayor.' },
    km:         { min: 0, msg: 'Ingresa 0 km o más.' },
    rend:       { mayorQue: 0, msg: 'El rendimiento debe ser mayor que 0 km/L.' },
    factorGas:  { min: 0, msg: 'El factor debe ser 0 o mayor.' },
    ocupantes:  { min: 1, entero: true, msg: 'Indica al menos 1 ocupante (número entero).' }
  },

  /** Devuelve {campo: mensaje} con los errores; vacío si todo es válido. */
  validar(v) {
    const errores = {};
    for (const [campo, r] of Object.entries(this.reglas)) {
      const n = v[campo];
      const mal = !Number.isFinite(n) ||
        (r.min !== undefined && n < r.min) ||
        (r.mayorQue !== undefined && n <= r.mayorQue) ||
        (r.entero && !Number.isInteger(n));
      if (mal) errores[campo] = r.msg;
    }
    return errores;
  },

  /** Calcula todo en base mensual. */
  calcular(v) {
    const kwhMes = v.periodo === 'bimestral' ? v.kwh / 2 : v.kwh;
    const elec = kwhMes * v.factorElec;
    const kmMes = v.km * 52 / 12;
    const litros = kmMes / v.rend;           // rend > 0 garantizado por validar()
    const gas = litros * v.factorGas;
    const total = elec + gas;
    return {
      kwhMes, kmMes, litros, elec, gas, total,
      individual: elec / v.personas + gas / v.ocupantes,
      pElec: total > 0 ? elec / total * 100 : 0,
      pGas: total > 0 ? gas / total * 100 : 0
    };
  }
};

/* ---------- 2. PERSISTENCIA ---------- */
const Store = {
  KEY: 'ecofootprint:ultimo',
  guardar(datos) {
    try { localStorage.setItem(this.KEY, JSON.stringify(datos)); return true; }
    catch (e) { return false; }
  },
  cargar() {
    try { return JSON.parse(localStorage.getItem(this.KEY)); } catch (e) { return null; }
  }
};

/* ---------- 3. INTERFAZ ---------- */
const $ = id => document.getElementById(id);
const CAMPOS = ['personas', 'kwh', 'periodo', 'factorElec', 'km', 'rend', 'factorGas', 'ocupantes'];
const DEFAULTS = { personas: 2, kwh: 150, periodo: 'mensual', factorElec: 0.44, km: 100, rend: 12, factorGas: 2.31, ocupantes: 1 };
let vista = 'mensual';
let ultimo = null; // {valores, resultados} válidos más recientes

const fmt = (n, d = 1) => n.toLocaleString('es-MX', { minimumFractionDigits: d, maximumFractionDigits: d });

function leer() {
  const v = {};
  CAMPOS.forEach(c => {
    const el = $(c);
    v[c] = c === 'periodo' ? el.value : (el.value.trim() === '' ? NaN : Number(el.value));
  });
  return v;
}

function escribir(v) {
  CAMPOS.forEach(c => { $(c).value = v[c]; });
  $('kmRange').value = Math.min(v.km, 1000);
}

function mensaje(texto, malo = false) {
  const s = $('status');
  s.textContent = texto;
  s.classList.toggle('bad', malo);
}

function vaciarResultados() {
  ['kwhMes', 'kmMes', 'litrosMes', 'total', 'indiv', 'vElec', 'vGas', 'donutTxt', 'eqTrees', 'eqKm', 'pillElec', 'pillGas']
    .forEach(id => { $(id).textContent = '—'; });
  ['pElec', 'pGas'].forEach(id => { $(id).textContent = ''; });
  $('barElec').style.width = $('barGas').style.width = '0';
  $('donut').style.background = '';
}

function actualizar() {
  const v = leer();
  const errores = Calc.validar(v);
  CAMPOS.forEach(c => {
    if (c === 'periodo') return;
    const el = $(c);
    el.setAttribute('aria-invalid', errores[c] ? 'true' : 'false');
    $('err-' + c).textContent = errores[c] || '';
  });
  mensaje('');
  if (Object.keys(errores).length) { ultimo = null; vaciarResultados(); return; }

  const r = Calc.calcular(v);
  ultimo = { valores: v, resultados: r };
  const k = vista === 'anual' ? 12 : 1;
  const u = vista === 'anual' ? 'kg CO₂e / año' : 'kg CO₂e / mes';

  $('kwhMes').textContent = fmt(r.kwhMes) + ' kWh';
  $('kmMes').textContent = fmt(r.kmMes, 0) + ' km';
  $('litrosMes').textContent = fmt(r.litros) + ' L/mes';
  $('pillElec').textContent = fmt(r.elec * k) + ' kg';
  $('pillGas').textContent = fmt(r.gas * k) + ' kg';
  $('vistaTag').textContent = vista === 'anual' ? 'Anual' : 'Mensual';
  $('total').textContent = fmt(r.total * k);
  $('totalUnit').textContent = u;
  $('indiv').textContent = fmt(r.individual * k) + ' ' + u;
  $('vElec').textContent = fmt(r.elec * k) + ' kg';
  $('vGas').textContent = fmt(r.gas * k) + ' kg';
  $('pElec').textContent = '(' + fmt(r.pElec) + ' %)';
  $('pGas').textContent = '(' + fmt(r.pGas) + ' %)';
  $('barElec').style.width = r.pElec + '%';
  $('barGas').style.width = r.pGas + '%';
  $('donut').style.background = r.total > 0
    ? `conic-gradient(var(--elec) 0 ${r.pElec}%, var(--gas) ${r.pElec}% 100%)` : '';
  $('donutTxt').textContent = r.total > 0 ? fmt(r.pElec, 0) + '% / ' + fmt(r.pGas, 0) + '%' : '0';
  $('eqTrees').textContent = fmt(r.total * 12 / Calc.KG_ARBOL_ANIO, 0);
  $('eqKm').textContent = fmt(r.total * k / Calc.KG_POR_KM, 0) + ' km';
}

function guardar() {
  if (!ultimo) return mensaje('Corrige los campos marcados antes de guardar.', true);
  const ok = Store.guardar({ ...ultimo, vista, fecha: new Date().toISOString() });
  ok ? mensaje('Resultado guardado en este navegador.') : mensaje('No se pudo guardar: el almacenamiento local no está disponible.', true);
}

function descargarCsv() {
  if (!ultimo) return mensaje('Corrige los campos marcados antes de descargar.', true);
  const { valores: v, resultados: r } = ultimo;
  const filas = [
    ['concepto', 'valor', 'unidad'],
    ['personas_hogar', v.personas, 'personas'],
    ['consumo_recibo', v.kwh, 'kWh'],
    ['periodo_recibo', v.periodo, ''],
    ['factor_electrico', v.factorElec, 'kg CO2e/kWh'],
    ['km_semana', v.km, 'km'],
    ['rendimiento', v.rend, 'km/L'],
    ['factor_gasolina', v.factorGas, 'kg CO2/L'],
    ['ocupantes_auto', v.ocupantes, 'personas'],
    ['kwh_mensuales', r.kwhMes.toFixed(2), 'kWh'],
    ['litros_mensuales', r.litros.toFixed(2), 'L'],
    ['emisiones_electricidad_mes', r.elec.toFixed(2), 'kg CO2e'],
    ['emisiones_gasolina_mes', r.gas.toFixed(2), 'kg CO2e'],
    ['emisiones_total_mes', r.total.toFixed(2), 'kg CO2e'],
    ['emisiones_total_anio', (r.total * 12).toFixed(2), 'kg CO2e'],
    ['emisiones_individual_mes', r.individual.toFixed(2), 'kg CO2e']
  ];
  try {
    const csv = '\ufeff' + filas.map(f => f.join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'ecofootprint.csv';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    mensaje('Archivo CSV generado.');
  } catch (e) { mensaje('No se pudo generar el CSV.', true); }
}

function init() {
  const guardado = Store.cargar();
  if (guardado && guardado.valores) { escribir(guardado.valores); if (guardado.vista) vista = guardado.vista; }
  else escribir(DEFAULTS);

  CAMPOS.forEach(c => $(c).addEventListener('input', () => {
    if (c === 'km' && Number.isFinite(Number($('km').value))) $('kmRange').value = Math.min(Number($('km').value), 1000);
    actualizar();
  }));
  $('kmRange').addEventListener('input', e => { $('km').value = e.target.value; actualizar(); });

  document.querySelectorAll('[data-vista]').forEach(b => {
    b.addEventListener('click', () => { vista = b.dataset.vista; syncVista(); actualizar(); });
  });
  $('btnReset').addEventListener('click', () => { escribir(DEFAULTS); actualizar(); });
  $('btnSave').addEventListener('click', guardar);
  $('btnCsv').addEventListener('click', descargarCsv);
  syncVista();
  actualizar();
}

function syncVista() {
  document.querySelectorAll('[data-vista]').forEach(b => {
    const on = b.dataset.vista === vista;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on);
  });
}

document.addEventListener('DOMContentLoaded', init);
