import { mongooseConnect } from '@/lib/mongoose'
import { Order } from '@/models/Order';
import React from 'react'

async function handler(req, res) {
  await mongooseConnect();
  res.json(Order.find().sort({createdAt:-1}))
}

export default handler;