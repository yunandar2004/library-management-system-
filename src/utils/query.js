// src/utils/query.js
function buildQuery({ q, filters = {}, fields = ['title', 'author', 'isbn', 'category', 'tags'] }) {
  const query = {};
  if (q) {
    query.$or = fields.map((f) => ({ [f]: { $regex: q, $options: 'i' } }));
  }
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    query[key] = value;
  });
  return query;
}

function paginate(req) {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

module.exports = { buildQuery, paginate };
