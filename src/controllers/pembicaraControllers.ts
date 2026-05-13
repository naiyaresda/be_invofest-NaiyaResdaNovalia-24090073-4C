import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara";

let pembicaras: Pembicara[] = [];

// 1. menampilkan semua data pembicara
export const getPembicaras = (req: Request, res: Response) => {
    res.json(pembicaras);
};

// 2. menambahkan data pembicara
export const createPembicara = (req: Request, res: Response) => {

    const { name, role, foto } = req.body;

    // validasi sederhana
    if (!name || !role || !foto) {
        return res.status(500).json({
            message: "Name, Role dan Foto harus diisi"
        });
    }

    // membuat data baru
    const newPembicara: Pembicara = {
        id: Date.now(),
        name: name,
        role: role,
        foto: foto,
    };

    // simpan data
    pembicaras.push(newPembicara);

    // response berhasil
    res.status(200).json({
        message: "Data berhasil disimpan",
        pembicara: newPembicara
    });
};

// 3. menampilkan detail pembicara berdasarkan id
export const getPembicara = (req: Request, res: Response) => {

    const id = parseInt(req.params.id as string);

    const pembicara = pembicaras.find((item) => item.id === id);

    if (!pembicara) {
        return res.status(404).json({
            message: "Data pembicara tidak ditemukan"
        });
    }

    res.status(200).json(pembicara);
};

// 4. mengupdate data pembicara berdasarkan id
export const updatePembicara = (req: Request, res: Response) => {

    const id = parseInt(req.params.id as string);

    const pembicara = pembicaras.find((item) => item.id === id);

    if (!pembicara) {
        return res.status(404).json({
            message: "Data pembicara tidak ditemukan"
        });
    }

    const { name, role, foto } = req.body;

    pembicara.name = name || pembicara.name;
    pembicara.role = role || pembicara.role;
    pembicara.foto = foto || pembicara.foto;

    res.status(200).json({
        message: "Data berhasil diupdate",
        pembicara
    });
};

// 5. menghapus data pembicara berdasarkan id
export const deletePembicara = (req: Request, res: Response) => {

    const id = parseInt(req.params.id as string);

    const index = pembicaras.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Data pembicara tidak ditemukan"
        });
    }

    pembicaras.splice(index, 1);

    res.status(200).json({
        message: "Data berhasil dihapus"
    });
};