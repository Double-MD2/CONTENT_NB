/**
 * Wrapper seguro para fetch que valida se a resposta é JSON antes de parsear
 * Previne erro "Unexpected token '<'" quando API retorna HTML em vez de JSON
 */

export interface SafeFetchOptions extends RequestInit {
  logPrefix?: string;
  allowNonOk?: boolean;
}

export async function safeFetch(url: string, options: SafeFetchOptions = {}) {
  const { logPrefix = '[FETCH]', allowNonOk = false, ...fetchOptions } = options;

  try {
    console.log(`${logPrefix} 🌐 Fazendo requisição para:`, url);

    const response = await fetch(url, fetchOptions);

    console.log(`${logPrefix} 📡 Status:`, response.status);
    console.log(`${logPrefix} 📡 Status Text:`, response.statusText);

    const contentType = response.headers.get('content-type');
    console.log(`${logPrefix} 📄 Content-Type:`, contentType);

    // Verificar se a resposta é OK (200-299) ou se allowNonOk está habilitado
    if (!response.ok && !allowNonOk) {
      console.error(`${logPrefix} ❌ Erro HTTP ${response.status}: ${response.statusText}`);

      // Tentar ler o corpo como texto para debug
      const bodyText = await response.text();
      console.error(`${logPrefix} 📄 Response body (primeiros 500 chars):`, bodyText.substring(0, 500));

      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Verificar se a resposta é JSON
    if (!contentType?.includes('application/json')) {
      console.error(`${logPrefix} ❌ Resposta não é JSON! Content-Type: ${contentType}`);

      // Ler corpo como texto para debug
      const bodyText = await response.text();
      console.error(`${logPrefix} 📄 Response body (primeiros 500 chars):`, bodyText.substring(0, 500));

      // Se começa com <!DOCTYPE ou <html, é HTML
      if (bodyText.trim().startsWith('<!DOCTYPE') || bodyText.trim().startsWith('<html')) {
        throw new Error('API retornou HTML em vez de JSON (possível 404 ou redirect)');
      }

      throw new Error(`Resposta não é JSON válido. Content-Type: ${contentType || 'ausente'}`);
    }

    // Parsear JSON com segurança
    const data = await response.json();
    console.log(`${logPrefix} ✅ JSON parseado com sucesso`);

    return { ok: response.ok, status: response.status, data };

  } catch (error) {
    console.error(`${logPrefix} ❌ Erro na requisição:`, error);
    throw error;
  }
}

/**
 * Versão simplificada que lança exceção se não for JSON válido
 */
export async function safeFetchJson<T = any>(url: string, options: SafeFetchOptions = {}): Promise<T> {
  const result = await safeFetch(url, options);
  return result.data as T;
}
