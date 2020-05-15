```json
{
  "id": "root",
  "states": {
    "Retool Challenge": {
      "id": "Retool Challenge",
      "states": {
        "IDLE": { "id": "IDLE", "states": {}, "on": { "try": "#EDITING" } },
        "EDITING": {
          "id": "EDITING",
          "states": {},
          "on": { "execute": "#WAITING", "untry": "#IDLE" }
        },
        "WAITING": {
          "id": "WAITING",
          "states": {},
          "on": { "data": "#HAS_DATA_EDITING" }
        },
        "HAS_DATA_EDITING": {
          "id": "HAS_DATA_EDITING",
          "states": {},
          "on": {
            "clear": "#EDITING",
            "execute": "#WAITING",
            "untry": "#HAS_DATA"
          }
        },
        "HAS_DATA": {
          "id": "HAS_DATA",
          "states": {},
          "on": { "clear": "#IDLE", "try": "#HAS_DATA_EDITING" }
        }
      },
      "initial": "IDLE",
      "on": {}
    }
  },
  "initial": "Retool Challenge",
  "on": {}
}
```
