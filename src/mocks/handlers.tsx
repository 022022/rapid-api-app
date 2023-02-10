import { rest } from 'msw';
import 'whatwg-fetch';
import { setupServer } from 'msw/node';

export const server = setupServer(
  rest.get("https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({status: false, data: []}), ctx.delay(150));
  })
);
