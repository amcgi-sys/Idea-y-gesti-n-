export type NcsClient = {
  externalId: string;
  legalName: string;
  taxId?: string;
};

export interface NcsAdapter {
  findClient(externalId: string): Promise<NcsClient | null>;
  syncClient(client: NcsClient): Promise<void>;
}

/**
 * Punto de integración deliberadamente desacoplado.
 * No implementa llamadas a sistemas NCS sin una interfaz/autorización técnica válida.
 */
export class DisabledNcsAdapter implements NcsAdapter {
  async findClient(): Promise<NcsClient | null> { return null; }
  async syncClient(): Promise<void> { return; }
}

export const ncsAdapter: NcsAdapter = new DisabledNcsAdapter();
