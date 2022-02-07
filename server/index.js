const { Application } = require('@squareup/service-container');
const { fetch } = require('@squareup/container-connector');
const { existsSync } = require('fs');

// const PORT = process.env.PORT || 3001;

// const app = express();

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

const UNAVAILABLE_FILE = 'tmp/unavailable';

const IS_PROD = process.env.ENVIRONMENT === 'production' || process.env.ENVIRONMENT === 'staging';
const serverConfig = {};

if (IS_PROD) {
  serverConfig.unixSocket = process.env.ENVOY_HTTP_INGRESS_SOCKET_PATH;
} else {
  serverConfig.port = 3000;
}

// async function get() {
//   // const res = await fetch('https://localhost:30597/_status', {
//   //   app: 'buyer-subs',
//   //   cloudProxy: false,
//   //   targetGroupType: 'staging'
//   // });
//   if (process.env.ENVIRONMENT === 'development') {
//     process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
//   }
//   // const res = fetch('https://buyer-subs.stage.sqprod.co/internal/subscription/1d8282b4-f6db-4d77-b0b2-c82dfd0fc6a6', {
//     // method: 'GET',
//     // body: JSON.stringify({
//     //   "service_name": "squareup.buyersubs.InternalSubscriptionsService",
//     //   "method_name": "InternalDecodeBuyerManagementToken",
//     //   "json_body": "{\"token\":\"EIiZPZaqk6lniJ47T5mRimBZRGf_UZ9DqRBeKn0-7i2E_LFxARY7zYlwkbwduztTSreL6fCgouwOYXAK5khGcDmoNuj35EXTabkEe10uDkvQpfxmNkCnVO6UwAr9mH3jow==\"}"
//     // })
//     const res = fetch('https://buyer-subs.stage.sqprod.co/internal/subscription/1d8282b4-f6db-4d77-b0b2-c82dfd0fc6a6').then(res => {
//     console.log({res})
//     return res.json();
//   }).catch(err => {
//     console.log({err})
//   })

//   return {
//     body: res
//   };
// }

const app = new Application({
	name: 'buyer-management',
	server: serverConfig
});

app.get('/_status', (_, res) => {
  const isUnavailable = existsSync(UNAVAILABLE_FILE);
  res.writeHead(isUnavailable ? 503 : 200);
  res.end(
    JSON.stringify({
      status: isUnavailable ? 'critical' : 'ok',
    }),
  );
});

app.get('/', (req, res) => {
  // const response = get();
  res.send({response});
});

app.start().then(() => {
  console.log('Running!');
}).catch(e => {
  console.error('Error in app stack:', e.stack);
});
