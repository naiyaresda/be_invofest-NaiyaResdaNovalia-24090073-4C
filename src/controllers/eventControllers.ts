import { Request, Response } from "express";
import { Event } from "../types/event";

let events: Event[] = [];

// 1. menampilkan semua data event
export const getEvents = (req: Request, res: Response) => {
    res.json(events);
};

// 2. menambahkan data event
export const createEvent = (req: Request, res: Response) => {

    const { name, date, location, description } = req.body;

    // validasi sederhana
    if (!name || !date || !location) {
        return res.status(500).json({
            message: "Name, Date dan Location harus diisi"
        });
    }

    // membuat data baru
    const newEvent: Event = {
        id: Date.now(),
        name: name,
        date: date,
        location: location,
        description: description,
    };

    // simpan data
    events.push(newEvent);

    // response berhasil
    res.status(200).json({
        message: "Data berhasil disimpan",
        event: newEvent
    });
};

// 3. menampilkan detail event berdasarkan id
export const showEvent = (req: Request, res: Response) => {

    const id = parseInt(req.params.id as string);

    const event = events.find((item) => item.id === id);

    if (!event) {
        return res.status(404).json({
            message: "Data event tidak ditemukan"
        });
    }

    res.status(200).json(event);
};

// 4. mengupdate data event berdasarkan id
export const updateEvent = (req: Request, res: Response) => {

    const id = parseInt(req.params.id as string);

    const event = events.find((item) => item.id === id);

    if (!event) {
        return res.status(404).json({
            message: "Data event tidak ditemukan"
        });
    }

    const { name, date, location, description } = req.body;

    event.name = name || event.name;
    event.date = date || event.date;
    event.location = location || event.location;
    event.description = description || event.description;

    res.status(200).json({
        message: "Data berhasil diupdate",
        event
    });
};

// 5. menghapus data event berdasarkan id
export const deleteEvent = (req: Request, res: Response) => {

    const id = parseInt(req.params.id as string);

    const index = events.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Data event tidak ditemukan"
        });
    }

    events.splice(index, 1);

    res.status(200).json({
        message: "Data berhasil dihapus"
    });
};