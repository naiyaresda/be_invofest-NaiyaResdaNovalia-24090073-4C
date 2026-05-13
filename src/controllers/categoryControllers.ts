import { Request, Response } from "express";
import { Category } from "../types/category";

let categories: Category[] = [];

// 1. menampilkan semua category
export const getCategories = (req: Request, res: Response) => {
    res.json(categories);
};

// 2. menambahkan category
export const createCategory = (req: Request, res: Response) => {

    const { name } = req.body;

    // validasi sederhana
    if (!name) {
        return res.status(500).json({
            message: "Name harus diisi"
        });
    }

    // membuat data baru
    const newCategory: Category = {
        id: Date.now(),
        name: name,
    };

    // simpan data
    categories.push(newCategory);

    // response berhasil
    res.status(200).json({
        message: "Data berhasil disimpan",
        category: newCategory
    });
};

// 3. menampilkan detail category berdasarkan id
export const getCategory = (req: Request, res: Response) => {

    const id = parseInt(req.params.id as string);

    const category = categories.find((item) => item.id === id);

    if (!category) {
        return res.status(404).json({
            message: "Category tidak ditemukan"
        });
    }

    res.status(200).json(category);
};

// 4. mengupdate category berdasarkan id
export const updateCategory = (req: Request, res: Response) => {

    const id = parseInt(req.params.id as string);

    const category = categories.find((item) => item.id === id);

    if (!category) {
        return res.status(404).json({
            message: "Category tidak ditemukan"
        });
    }

    const { name } = req.body;

    category.name = name || category.name;

    res.status(200).json({
        message: "Category berhasil diupdate",
        category
    });
};

// 5. menghapus category berdasarkan id
export const deleteCategory = (req: Request, res: Response) => {

    const id = parseInt(req.params.id as string);

    const index = categories.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Category tidak ditemukan"
        });
    }

    categories.splice(index, 1);

    res.status(200).json({
        message: "Category berhasil dihapus"
    });
};