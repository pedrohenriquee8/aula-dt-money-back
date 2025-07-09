import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Response } from 'express';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Res() res: Response,
  ) {
    const createdTransaction =
      await this.transactionService.create(createTransactionDto);
    res.status(HttpStatus.CREATED).send(createdTransaction);
    return;
  }

  @Get()
  async findAll(@Res() res: Response) {
    const transactions = await this.transactionService.findAll();

    if (!transactions || !transactions.length) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'No transactions found.' });
    }

    return res.status(HttpStatus.OK).send(transactions);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const foundTransaction = await this.transactionService.findOne(id);

    if (!foundTransaction) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'No transaction found.' });
    }
    return res.status(HttpStatus.OK).send(foundTransaction);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Res() res: Response,
  ) {
    const updatedTransaction = await this.transactionService.update(
      id,
      updateTransactionDto,
    );

    if (!updatedTransaction) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'No transaction found.' });
    }

    return res.status(HttpStatus.OK).send(updatedTransaction);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const transaction = await this.transactionService.remove(id);

    if (!transaction) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'No transaction found.' });
    }

    return res.status(HttpStatus.OK).send(transaction);
  }
}
