import { parseArgs } from 'util';

export function parseConfig() {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      target: {
        type: 'string',
        short: 't',
      },
      port: {
        type: 'string',
        short: 'p',
      }
    },
    strict: true,
    allowPositionals: true,
  });

  if (!values.target) {
    throw Error('Target is required');
  }

  const targetUrl = new URL(values.target);

  return {
    target: targetUrl.toString(),
    port: values.port ? +values.port : 9090,
  }
}
