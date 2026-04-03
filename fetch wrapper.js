async function api(path, opts = {}) {
   if (!opts.headers) opts.headers = {};
   if (["post", "put", "patch"].includes(opts.method))
      opts.headers["Content-Type"] = "application/json";


   const res = await fetch(path, {
      ...opts,
      headers: {
         ...opts.headers,
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
   });


   if (!res.ok) throw { status: res.status, data: await res.json().catch(() => null) };
   return res.json().catch(() => null);
}


for (const method of ["get", "post", "put", "patch", "delete"]) {
   api[method] = (path, opts) => api(path, { ...opts, method });
}