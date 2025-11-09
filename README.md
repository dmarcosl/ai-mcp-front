# AI MCP Front

This project is a simple **Angular 20.3** frontend for interacting with AI-powered MCP agents.

It connects to an AI orchestrator backend through a `POST /agent` endpoint and dynamically renders responses as tables or charts.

The UI is fully built with **Angular Material** and **Chart.js**, using a conversational interface that allows you to request data in natural language — for example:
> “Show me all sales in a table” → table visualization  
> “Show them in a pie chart” → pie chart visualization

You can use it independently or with this other solution: https://github.com/dmarcosl/spring-ai-mcp-demoents.

---

## 🐳 Run with Docker

### 1. Build the image

```bash
docker build -t ai-mcp-front .
```

### 2. Run the container

```bash
docker run --rm -p 8080:80 ai-mcp-front
```

The application will be available at:

```
http://localhost:8080
```

### 3. Extra (Optional)

By default, it expects the backend agent at:

```
http://localhost:8086/agent
```

You can configure this in `src/app/app.config.ts` by changing:

```ts
{ provide: 'AGENT_BASE_URL', useValue: 'http://localhost:8086' }
```

---

## 🧩 Example JSON Response (from backend)

### Only chat

```json
{
  "assistantText": "The requested combination of item and color is not available."
}
```

### Table

```json
{
  "assistantText": "Here is the current stock by item and color.",
  "uiSpec": {
    "type": "table",
    "title": "Current Stock",
    "columns": [
      { "id": "name", "header": "Item" },
      { "id": "color", "header": "Color" },
      { "id": "quantity", "header": "Units" }
    ],
    "rows": [
      { "name": "Pants", "color": "Pink", "quantity": 34 },
      { "name": "Pants", "color": "Green", "quantity": 15 },
      { "name": "Skirt", "color": "Black", "quantity": 22 }
    ]
  }
}
```

### Pie chart

```json
{
  "assistantText": "Here’s the stock distribution by item and color.",
  "uiSpec": {
    "type": "pie",
    "title": "Stock Distribution",
    "labels": ["Pants Pink", "Pants Green", "Skirt Black"],
    "data": [34, 15, 22]
  }
}
```

### Bar chart

```json
{
  "assistantText": "Here are the total sales by item and color.",
  "uiSpec": {
    "type": "bar",
    "title": "Units Sold",
    "labels": ["Pants Pink", "Pants Green", "Skirt Black"],
    "data": [34, 15, 22]
  }
}
```

---

## 🧠 Features

| Component         | Description                                                                            |
|-------------------|----------------------------------------------------------------------------------------|
| **Chat Panel**    | Conversational interface for sending prompts to the `/agent` backend.                  |
| **Render Panel**  | Dynamically displays data in tables, bar charts, or pie charts.                        |
| **UiSpec Engine** | Reactive service that maps backend JSON responses to Material and Chart.js components. |

---

## 🪪 License

MIT
