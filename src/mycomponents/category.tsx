"use client";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect } from "react";

function Category() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ category: "" });
  const [editCategory, setEditCategory] = useState({ _id: "", category: "" });

  const handleAddCategory = async () => {
    console.log("Adding new category" + newCategory);
    try {
      const response = await axios.post(
        "/api/categories/addcategories",
        newCategory
      );
      console.log("Add category success", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (index) => {
    console.log("here" + index);
    const categoryToDelete = categories[index];
    console.log(categoryToDelete._id);

    try {
      const response = await axios.delete("/api/categories/deletecategories/", {
        data: { id: categoryToDelete._id },
      });
      console.log("category Deleted Success" + response);
      const updatedCategories = categories.filter((_, i) => i !== index); // Remove the deleted category from the list
      setCategories(updatedCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartEdit = (index) => {
    const categoryToEdit = categories[index];
    setEditCategory({ ...categoryToEdit });
  };
  const handleSaveEdit = async (index) => {
    const categoryToEdit = categories[index];

    console.log("Editing category: ", categoryToEdit);

    try {
      const response = await axios.put("/api/categories/editcategories", {
        id: categoryToEdit._id,
        category: editCategory.category,
      });

      console.log("Edit category success: ", response.data);

      const updatedCategories = [...categories];
      const editedIndex = updatedCategories.findIndex(
        (category) => category._id === categoryToEdit._id
      );
      if (editedIndex !== -1) {
        updatedCategories[editedIndex] = {
          ...updatedCategories[editedIndex],
          ...response.data.updatedCategory,
        };
        setCategories(updatedCategories);
        setEditCategory({ _id: "", category: "" }); // Reset the edit state
      }
    } catch (error) {
      console.error("Error editing category: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/categories/getallcategories");
        console.log("response", response.data.response);
        setCategories(response.data.response);
      } catch (error) {
        console.log(error + "after getting all category");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ScrollArea className="rounded-md border">
        <Table>
          <TableCaption>A list of all categories</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>

              <TableHead>
                <Popover>
                  <PopoverTrigger>
                    <Button>Add</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Card>
                      <CardHeader>
                        <CardTitle>ADD</CardTitle>
                        <CardDescription>
                          Click on Save after Changes
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Input
                          placeholder="Category"
                          value={newCategory.category}
                          onChange={(e) =>
                            setNewCategory({
                              ...newCategory,
                              category: e.target.value,
                            })
                          }
                        />
                      </CardContent>

                      <CardFooter>
                        <Button onClick={handleAddCategory}>Save</Button>
                      </CardFooter>
                    </Card>
                  </PopoverContent>
                </Popover>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category._id}>
                {" "}
                <TableCell>{category.category}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger onClick={() => handleStartEdit(index)}>
                      Edit
                    </PopoverTrigger>
                    <PopoverContent>
                      <Card>
                        <CardHeader>
                          <CardTitle>Edit</CardTitle>
                          <CardDescription>
                            Click on Save after Changes
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Input
                            placeholder="Category"
                            value={editCategory.category}
                            onChange={(e) =>
                              setEditCategory({
                                ...editCategory,
                                category: e.target.value,
                              })
                            }
                          />
                        </CardContent>
                        <CardFooter>
                          <Button
                            onClick={() => {
                              handleSaveEdit(index);
                            }}
                          >
                            Save
                          </Button>
                        </CardFooter>
                      </Card>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>Delete</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your category and remove your data from our
                          servers.
                        </DialogDescription>
                        <Button onClick={() => handleDeleteCategory(index)}>
                          Delete
                        </Button>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default Category;
