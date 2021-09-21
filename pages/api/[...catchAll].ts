import { NextApiRequest, NextApiResponse } from 'next';
import { Backend } from '../../backend/main';

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise(async (resolve) => {
    const listener = await Backend.getListener();
    listener(req, res);
    res.on('finish', resolve);
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
