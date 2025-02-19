import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { KnexInstrumentation } from '@opentelemetry/instrumentation-knex';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const sdk = new NodeSDK({
  serviceName: undefined,
  traceExporter: new OTLPTraceExporter({
    url: undefined,
    compression: undefined
  }),
  instrumentations: [
  ]
})

process.on('beforeExit', async () => {
  await sdk.HttpInstrumentation();
})

export const initializeTracing = async () => {
  return sdk.start();
}
