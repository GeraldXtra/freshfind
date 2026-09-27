# Site map

```mermaid
flowchart TD
  H[Home] --> D[Market Directory]
  H --> P[Produce Guide]
  H --> S[Seasonal Picks]
  H --> A[About Us]
  H --> C[Contact Us]
  H --> B[My Bookmarks]
  D --> M[Market Detail]
  P --> M
  S --> M
  B --> M
  B --> P
  X[Chatbot on every page] --> M
  X --> P
  X --> D
  Q[Search overlay on every page] --> M
  Q --> D
  N[Not Found for wrong links] --> H
```
