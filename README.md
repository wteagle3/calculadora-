# PLAN DE CALIDAD DEL PROYECTO

## 1. Introducción

El presente Plan de Calidad establece las actividades, criterios, métricas y procedimientos que se utilizarán para garantizar la calidad del proyecto **MenosHuella**, una aplicación web desarrollada con HTML, CSS y JavaScript que permitirá estimar las emisiones de CO₂ generadas por el consumo eléctrico de un hogar.

La calidad es un aspecto fundamental del proyecto, debido a que un error en los datos introducidos, en las validaciones o en la fórmula utilizada podría generar resultados incorrectos para el usuario. Por esta razón, se realizarán actividades de prevención, revisión, pruebas y corrección durante las diferentes etapas del desarrollo.

El proyecto contempla como principales criterios de calidad que los cálculos sean correctos, los datos sean validados, la interfaz sea clara, el sistema tenga un tiempo de respuesta rápido y funcione correctamente en diferentes navegadores y dispositivos. Estos criterios forman parte de los establecidos en el proyecto original.

## 2. Objetivo del Plan de Calidad

Establecer los procedimientos necesarios para asegurar que la aplicación **Sin Huella** cumpla con los requisitos funcionales y no funcionales definidos, proporcionando resultados correctos, una interfaz fácil de utilizar, buen rendimiento y compatibilidad con diferentes dispositivos y navegadores.

### Objetivos específicos

- Verificar que todos los requisitos funcionales sean implementados correctamente.
- Comprobar que los cálculos de emisiones de CO₂ sean correctos.
- Validar los datos introducidos por los usuarios.
- Detectar y corregir errores antes de la entrega final.
- Garantizar que la interfaz sea clara y fácil de utilizar.
- Comprobar la adaptación de la aplicación a computadoras, tablets y teléfonos celulares.
- Verificar el funcionamiento en Google Chrome, Microsoft Edge y Mozilla Firefox.
- Mantener el código organizado y facilitar su mantenimiento.
- Registrar los cambios realizados mediante Git y GitHub.

## 3. Alcance de la calidad

El plan de calidad abarcará las principales funciones de la primera versión de MenosHuella:

- Registro del número de integrantes del hogar.
- Registro del consumo eléctrico en kWh.
- Selección del periodo del recibo.
- Validación de los datos.
- Cálculo de emisiones estimadas de CO₂.
- Cálculo de emisiones por integrante.
- Presentación visual de resultados.
- Indicador del nivel de consumo.
- Recomendaciones para reducir el consumo eléctrico.
- Realización de nuevos cálculos.
- Adaptabilidad a diferentes tamaños de pantalla.

La primera versión no contempla base de datos ni cuentas de usuario, por lo que estas funcionalidades quedan fuera del alcance actual.

## 4. Criterios de calidad

Para considerar que el proyecto cumple con los estándares establecidos, deberá cumplir los siguientes criterios:

| Criterio | Descripción |
| --- | --- |
| Exactitud | Los cálculos de CO₂ deberán producir resultados correctos. |
| Validación | Los datos incorrectos, negativos o incompletos deberán ser rechazados. |
| Usabilidad | La interfaz deberá ser clara, sencilla y fácil de utilizar. |
| Rendimiento | El resultado del cálculo deberá mostrarse rápidamente. |
| Compatibilidad | La aplicación deberá funcionar correctamente en navegadores modernos. |
| Adaptabilidad | La interfaz deberá visualizarse correctamente en computadoras, tablets y celulares. |
| Mantenibilidad | El código deberá estar organizado y separado en HTML, CSS y JavaScript. |
| Confiabilidad | No deberán existir errores críticos al momento de la entrega. |
| Control de cambios | Las modificaciones deberán registrarse mediante Git y GitHub. |

Estos criterios se basan en los criterios de calidad y requisitos no funcionales definidos para el proyecto.

## 5. Actividades de aseguramiento de la calidad

Para asegurar la calidad del proyecto se realizarán actividades durante todas las etapas del desarrollo.

### 5.1 Revisión de requisitos

Antes de comenzar el desarrollo se revisarán los requisitos funcionales y no funcionales para verificar que sean claros y que el equipo comprenda correctamente las funcionalidades que deberán implementarse. Se comprobará que los requisitos RF01 a RF11 estén contemplados en el desarrollo.

### 5.2 Revisión del diseño

Se revisará el diseño de la interfaz antes de finalizar su implementación. Se verificará:

- Claridad de los formularios.
- Distribución de los elementos.
- Facilidad de navegación.
- Legibilidad de textos.
- Presentación de resultados.
- Adaptabilidad a diferentes tamaños de pantalla.

### 5.3 Revisión del código

El código desarrollado deberá revisarse para identificar errores y mantener una estructura organizada. La aplicación contará inicialmente con:

- `index.html`
- `style.css`
- `app.js`
- `README.md`

Esta separación permitirá facilitar las modificaciones y el mantenimiento del sistema.

### 5.4 Pruebas funcionales

Se realizarán pruebas utilizando diferentes valores de entrada para verificar que cada funcionalidad produzca el resultado esperado. Entre las pruebas se incluirán:

- Número de integrantes válido.
- Número de integrantes inválido.
- Consumo eléctrico válido.
- Consumo eléctrico negativo.
- Campos vacíos.
- Cálculos completos.
- Nuevo cálculo.
- Visualización en dispositivos móviles.

El plan de pruebas original contempla estos casos para verificar el funcionamiento de la aplicación.

### 5.5 Pruebas de compatibilidad

La aplicación será probada en los siguientes navegadores:

- Google Chrome.
- Microsoft Edge.
- Mozilla Firefox.

También se verificará su funcionamiento en diferentes tamaños de pantalla, incluyendo computadoras, tablets y teléfonos celulares.

### 5.6 Pruebas de rendimiento

Se medirá el tiempo que tarda la aplicación en mostrar el resultado después de solicitar el cálculo. La meta establecida será:

**Tiempo de respuesta del cálculo < 1 segundo.**

## 6. Métricas de calidad

Para evaluar objetivamente la calidad del proyecto se utilizarán las siguientes métricas:

| Indicador | Meta |
| --- | --- |
| Requerimientos funcionales completados | 100% |
| Pruebas satisfactorias | ≥ 90% |
| Errores críticos | 0 |
| Errores detectados corregidos | ≥ 95% |
| Funcionalidades terminadas | 100% |
| Cumplimiento de requisitos | ≥ 90% |
| Tiempo de respuesta | < 1 segundo |
| Navegadores compatibles | 3 |
| Adaptabilidad móvil | 100% |

Estas métricas permitirán determinar de manera objetiva si la aplicación cumple con los niveles de calidad establecidos.

## 7. Gestión de errores

Cuando se detecte un error durante las pruebas, deberá registrarse y clasificarse para determinar su prioridad. Los errores podrán clasificarse como:

- **Crítico:** impide utilizar una función principal de la aplicación.
- **Alto:** afecta una función importante, pero permite continuar utilizando parte del sistema.
- **Medio:** afecta parcialmente una funcionalidad.
- **Bajo:** error visual o de poca importancia que no afecta el funcionamiento principal.

Los errores críticos deberán corregirse antes de la entrega final. Después de realizar una corrección, se deberá repetir la prueba correspondiente para comprobar que el problema haya sido solucionado y que la modificación no haya generado nuevos errores.

## 8. Control de cambios

Todos los cambios importantes realizados al proyecto deberán registrarse mediante Git y GitHub. Cada cambio deberá incluir:

- Fecha.
- Cambio realizado.
- Integrante responsable.
- Motivo del cambio.
- Estado del cambio.

Además, se utilizarán mensajes de commit para identificar claramente las modificaciones, por ejemplo:

- `feat: agregar formulario de consumo`
- `feat: implementar calculadora de CO2`
- `style: mejorar diseño de resultados`
- `fix: corregir validación de kWh`
- `test: agregar pruebas de cálculo`
- `docs: actualizar documentación`

Este mecanismo permitirá mantener un historial de modificaciones y facilitar el control del proyecto.

## 9. Responsabilidades de calidad

La responsabilidad de la calidad será compartida entre los cuatro integrantes del equipo.

| Integrante | Responsabilidad relacionada con calidad |
| --- | --- |
| Integrante 1 | Coordinación, requisitos y documentación. |
| Integrante 2 | Desarrollo de HTML y JavaScript, formulario y cálculos. |
| Integrante 3 | Desarrollo de CSS, interfaz y adaptación móvil. |
| Integrante 4 | Pruebas, control de calidad, métricas, detección de errores y control de cambios. |

Aunque cada integrante tendrá responsabilidades específicas, todos participarán en las actividades de análisis, desarrollo, pruebas y presentación final.

## 10. Criterios de aceptación

La aplicación podrá considerarse lista para su entrega cuando:

1. El 100% de los requerimientos funcionales principales estén implementados.
2. Los cálculos de CO₂ produzcan resultados correctos.
3. Los datos inválidos sean identificados y generen mensajes de error.
4. Las pruebas satisfactorias sean iguales o superiores al 90%.
5. No existan errores críticos pendientes.
6. Al menos el 95% de los errores detectados hayan sido corregidos.
7. El tiempo de respuesta del cálculo sea menor a un segundo.
8. La aplicación funcione correctamente en Chrome, Edge y Firefox.
9. La interfaz sea adaptable a dispositivos móviles.
10. Los cambios realizados estén registrados mediante Git y GitHub.

## 11. Seguimiento y evaluación

El seguimiento de la calidad se realizará durante los diferentes sprints del proyecto.

- **Sprint 1:** se revisarán los requisitos y el alcance.
- **Sprint 2:** se revisará el diseño de la interfaz y la estructura de la aplicación.
- **Sprint 3:** se revisará el código, las validaciones y la implementación de los cálculos.
- **Sprint 4:** se realizarán las pruebas con diferentes valores y dispositivos, además de detectar y corregir errores.
- **Sprint 5:** se realizará la revisión final de requisitos, métricas, errores, documentación y preparación de la presentación.

## 12. Resultado esperado

Al finalizar el proyecto se espera contar con una aplicación web funcional, confiable y fácil de utilizar, capaz de recibir el consumo eléctrico y número de integrantes de un hogar para generar una estimación de sus emisiones de CO₂.

El cumplimiento de este Plan de Calidad permitirá reducir errores, verificar que las funcionalidades cumplan con los requisitos establecidos y proporcionar resultados consistentes a los usuarios. De esta manera, la calidad contribuirá directamente a que MenosHuella sea una herramienta confiable para ayudar a los usuarios a comprender el impacto ambiental de su consumo eléctrico.
