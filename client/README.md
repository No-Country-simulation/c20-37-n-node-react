### Info

# 4. Commits
- Utilizar Commits Semánticos: Adoptar commits semánticos siguiendo la estructura propuesta para mantener la claridad y el orden en el historial de cambios.
  - Estructura Básica:
    tipo(scope): descripción
  - Ejemplo:
    feat(auth): add user authentication using JWT
    
Tipos Comunes:
    - feat: Nueva característica o funcionalidad (feature).
    - fix: Corrección de un bug.
    - docs: Cambios en la documentación.
    - style: Cambios de formato o estilo (espacios, puntos y comas, etc.) que no afectan el código.
    - refactor: Mejora en la estructura del código sin corregir errores ni añadir características.
    - test: Añadir o corregir tests.
  - Realizar Commits Diarios: Hacer commits en un horario adecuado para que el TL pueda realizar un seguimiento del trabajo.

5. Flujo de Trabajo desde el Repositorio Local
- Pasos Básicos para Trabajar de Manera Segura:
  1. Cambiar a la Rama de Desarrollo:
     git checkout development
    
  2. Traer los Últimos Cambios del Repositorio Remoto:
     git fetch
  3. Actualizar la Rama Local con los Últimos Cambios:
     git pull
  4. Cambiar a tu Rama Personal o de Característica:
     git checkout nombre-rama
  5. Fusionar los Cambios de la Rama de Desarrollo a Tu Rama:
     git merge development
  6. Realizar Commits y Subir Cambios al Repositorio Remoto:
     git add .
     git commit -m "mensaje del commit"
     git push

Posibles calendarios: React big calendar - FullCalendar