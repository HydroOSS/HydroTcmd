import meta from "./meta";
import * as r from "rethinkdb";

const args = {
  method: process.argv[2],
  extra: process.argv[3],
};

switch (args.method) {
  case "info":
    console.log(
      `${meta.name} v${meta.version} by ${meta.author} et al.
${meta.description}
      
web: ${meta.homepage}`
    );
    break;

  case "servers":
  case "users":
  case "strikes":
  case "merits":
  case "giveaways":
    r.connect({ host: "localhost", port: 28015 }, (err, conn) => {
      if (err) throw err;
      r.db("Hydro").table(args.method).get(args.extra).run(conn).then(console.log);
    });
    break;

  default:
    console.log("hydro-tcmd: unknown method");
}
