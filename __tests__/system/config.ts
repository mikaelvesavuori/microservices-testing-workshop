/**
 * Configuration of endpoints
 */
export const getEndpointConfig = (id: string, region: string, env: 'dev' | 'prod') => {
  if (!id || !region || !env) throw new Error('Missing id, region, or env!');

  return {
    createOrderServiceEndpoint: `https://${id}.execute-api.${region}.amazonaws.com/${env}/createOrder`,
    getOrdersServiceEndpoint: `https://${id}.execute-api.${region}.amazonaws.com/${env}/getOrders`
  };
};
