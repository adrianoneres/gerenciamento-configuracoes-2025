import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { KnexInstrumentation } from '@opentelemetry/instrumentation-knex';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const sdk = new NodeSDK({
  serviceName: 'students-api',
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4317',
    compression: 'gzip'
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new KnexInstrumentation()
  ]
})

process.on('beforeExit', async () => {
  await sdk.HttpInstrumentation();
})

export const initializeTracing = async () => {
  return sdk.start();
}
