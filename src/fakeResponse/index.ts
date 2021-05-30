function fakeResponse(body: Record<string, unknown>): Response {
  const headers = {
    'Content-Type': 'application/json',
  }

  const responseInit = {
    headers,
  }

  return new Response(JSON.stringify(body), responseInit)
}

export default fakeResponse
