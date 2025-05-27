# MCP Test

Este proyecto es un **MCP** (Message Control Protocol) que corre en modo **stdio**. Su propósito es actuar como intermediario entre el cliente desktop de Claude y otros servicios, facilitando la comunicación mediante mensajes estructurados.

## ¿Para qué sirve este MCP?

- Permite recibir y enviar mensajes entre el cliente desktop de Claude y otros sistemas.
- Facilita la integración y automatización de flujos de trabajo usando Claude.
- Corre en modo **stdio**, lo que lo hace fácil de integrar en pipelines y scripts.

## ¿Cómo conectar el MCP con el cliente desktop de Claude?

1. **Descarga e instala el cliente desktop de Claude** si aún no lo tienes.
2. **Ejecuta el MCP** desde la terminal:

   ```sh
   node index.js
   ```

   O el comando correspondiente según tu entorno.

3. **Configura el cliente de Claude** para que utilice el MCP como backend:

   - Abre la configuración del cliente.
   - Busca la opción para especificar un backend personalizado.
   - Selecciona la opción de conexión por **stdio** y apunta al ejecutable de este MCP.

4. **Inicia la comunicación**:
   - Al enviar mensajes desde el cliente de Claude, estos serán procesados por el MCP y podrás ver la interacción en la terminal.

## Notas

- Asegúrate de que el MCP tenga permisos de ejecución.
- Puedes modificar el MCP para agregar lógica personalizada según tus necesidades.

---

¿Dudas o sugerencias? ¡Abre un issue!
