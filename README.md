## Storion Documentation

Storion is a **framework-agnostic client-side database** for the browser. It powers Storion Studio and is available as the `@storion/storion` npm package.

---

### Links

- **Storion (library)**: [github.com/storionjs/storion](https://github.com/storionjs/storion)
- **npm**: [@storion/storion](https://www.npmjs.com/package/@storion/storion)
- **Storion Studio (Chrome extension)**: [Chrome Web Store](https://chromewebstore.google.com/detail/nhjidnpjlfnejdakbiccdhmphankkocm?utm_source=item-share-cb)

---

### Query syntax

Storion Studio uses a **JSON query object** to filter and sort table data. Use it in the Query panel when viewing a table.  
The query has four optional top-level keys: `where`, `orderBy`, `limit`, and `offset`. Omit a key or use `null` to skip that part.

**Full query structure**

```json
{
  "where": null,
  "orderBy": [],
  "limit": 1000,
  "offset": 0
}
```

#### Where clause

The `where` clause filters rows. Use a single condition with `field`, `op`, and `value`; or use `"and"` / `"or"` with an array of conditions.  
You can nest `and` / `or` for complex filters.

**Single condition: status equals `"active"`**

```json
{
  "where": {
    "field": "status",
    "op": "eq",
    "value": "active"
  }
}
```

**AND: multiple conditions**

```json
{
  "where": {
    "and": [
      { "field": "status", "op": "eq", "value": "active" },
      { "field": "name", "op": "contains", "value": "smith" }
    ]
  }
}
```

**OR: status is `"active"` or `"pending"`**

```json
{
  "where": {
    "or": [
      { "field": "status", "op": "eq", "value": "active" },
      { "field": "status", "op": "eq", "value": "pending" }
    ]
  }
}
```

**Nested: `(a = 1 and b = 2) or c = 3`**

```json
{
  "where": {
    "or": [
      {
        "and": [
          { "field": "a", "op": "eq", "value": 1 },
          { "field": "b", "op": "eq", "value": 2 }
        ]
      },
      { "field": "c", "op": "eq", "value": 3 }
    ]
  }
}
```

#### Operators

Use these values for the `"op"` field in a `where` condition.  
String comparisons are **case-insensitive**.  
For `"in"` and `"notIn"`, `value` must be an array.  
For `"isNull"` and `"isNotNull"`, `value` is not used.

**Comparison**

```text
"op": "eq"   → equals
"op": "ne"   → not equals
"op": "gt"   → greater than
"op": "gte"  → greater than or equal
"op": "lt"   → less than
"op": "lte"  → less than or equal
```

**String**

```text
"op": "contains"    → string contains (case-insensitive)
"op": "startsWith"  → string starts with
"op": "endsWith"    → string ends with
```

**List & null**

```text
"op": "in"        → value in list (value must be an array)
"op": "notIn"     → value not in list
"op": "isNull"    → value is null/undefined (no value needed)
"op": "isNotNull" → value is not null
```

#### Example queries

Copy any example into the Query panel and adjust field names to match your table. Click **Run** to apply the filter and sort.

**No filter (show all rows)**

```json
{}
```

**Name contains `"foo"`**

```json
{
  "where": {
    "field": "name",
    "op": "contains",
    "value": "foo"
  }
}
```

**Status in list**

```json
{
  "where": {
    "field": "status",
    "op": "in",
    "value": ["active", "pending", "draft"]
  }
}
```

**Amount greater than 100**

```json
{
  "where": {
    "field": "amount",
    "op": "gt",
    "value": 100
  }
}
```

**Email is null**

```json
{
  "where": {
    "field": "email",
    "op": "isNull"
  }
}
```

**Filter + sort + limit**

```json
{
  "where": {
    "and": [
      { "field": "status", "op": "eq", "value": "active" },
      { "field": "name", "op": "contains", "value": "smith" }
    ]
  },
  "orderBy": [
    { "field": "created_at", "direction": "desc" },
    { "field": "id", "direction": "asc" }
  ],
  "limit": 100,
  "offset": 0
}
```

---

### CRUD & tables

#### Create database

Create a new database from the sidebar. Each database is a separate namespace for tables. Choose a name (e.g. `myApp`) and click **Create**.

**In the UI**

```text
1. Click "+ New" under Databases
2. Enter database name (e.g. myAppDB)
3. Click Create
```

#### Create table

After selecting a database, create a table with columns. Each column has a name and a type: `int`, `float`, `boolean`, `string`, or `json`.  
An `id` column (integer, auto-generated) is added if you don’t define it. You can optionally set a foreign key reference to another table.

**Example columns**

```text
name   → type: string
email  → type: string
active → type: boolean
amount → type: float
meta   → type: json
Optional: reference another table (e.g. user_id → users.id)
```

#### Insert row

When viewing a table, click **Add Row**. Fill in values for each column. The `id` column is auto-generated if left empty.  
Values are validated and coerced to the column type (for example, `json` columns accept valid JSON text).

**In the UI**

```text
1. Open a table
2. Click "+ Add Row"
3. Fill in values (id is auto-generated if empty)
4. Click Save
```

#### Fetch rows

Opening a table loads all its rows. Use the Query panel to filter and sort.  
The table view shows paginated results (e.g. 50 per page). Row count and pagination are shown at the bottom.

**Steps**

```text
1. Select a database, then a table
2. All rows are loaded; use Query panel to filter/sort
3. Use where, orderBy, limit, offset in the query JSON
```

#### Update row

Click the edit (pencil) icon on a row to change its values. You cannot change the `id`. Other columns are validated and coerced to their types.

```text
1. Find the row in the table
2. Click the edit (pencil) icon
3. Change values in the form
4. Click Save
```

#### Delete row

Click the delete (trash) icon on a row to remove it.  
If another table has a foreign key pointing to this row, the delete may be blocked to keep referential integrity.

```text
1. Find the row in the table
2. Click the delete (trash) icon
3. Confirm deletion
```

#### Column types

Supported column types: `int` (integer), `float` (number), `boolean` (true/false), `string` (text), `json` (object or array).  
For `json` columns, query operators work on the stringified form; in the table view and edit form, values are shown as formatted JSON.

**Available types**

```text
int     → integer
float   → number
boolean → true / false
string  → text
json    → object or array (stored and compared as JSON)
```

---

### Change subscriptions & sync

#### Overview

The Storion engine that powers Storion Studio supports **change subscriptions** and an optional **cross-context hook**.  
In your own app, you can subscribe to table or row changes so multiple components stay in sync when data is updated—without polling.

**Subscribe to table changes (in your app code)**

```ts
import { createDatabase } from 'storion';

const db = await createDatabase({ name: 'myapp', storage: 'localStorage' });

// Subscribe to all changes in the "todos" table
const unsubscribe = db.subscribe('todos', (event) => {
  console.log(event.type, event.row); // 'insert' | 'update' | 'delete' | 'tableCreated' | 'tableDeleted'
  // Refresh your UI or state here
});

// later:
unsubscribe();
```

#### Cross-context sync (extension ↔ webapp)

For advanced setups, Storion can act as the **source of truth** in one context (for example, a Chrome extension) and stream change events to another context (for example, a webapp) over a custom transport.  
The library provides `db.setChangeBroadcaster` on the producer side and `createChangeListener` on the receiver side.

**Conceptual wiring with `window.postMessage`**

```ts
// Producer side (e.g. extension popup/background)
db.setChangeBroadcaster({
  broadcastChange(event) {
    window.postMessage({ source: 'storion-change', payload: event }, '*');
  }
});

// Receiver side (e.g. webapp using the storion npm package)
import { createChangeListener } from 'storion';

const transport = {
  onMessage(handler) {
    function listener(ev) {
      if (!ev.data || ev.data.source !== 'storion-change') return;
      handler(ev.data.payload);
    }
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }
};

const stop = createChangeListener(transport, (event) => {
  console.log('Received change from another context:', event);
});
```

