import { TicketModel } from "../models/Ticket.model.js"



export const CreateTicketService = async (data) => {
    const result = await TicketModel.create(data);
    return result;
};

export const GetTicketServiceByCreator = async (creator,limit,skip) => {
    const result = await TicketModel.find({creator}).sort({_id:-1}).skip(skip).limit(limit).lean();
    return result;
};

export const UpdateTicketService =  async (id,data) => {
    const result = await TicketModel.findByIdAndUpdate(id,data,{new:true,lean:true});
    return result;
};

export const DeleteTicketService = async (id) => {
    const result = await TicketModel.findByIdAndDelete(id);
    return result;
};


















