"use client"

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";


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

function Source() {
  const [sources, setSources] = useState([{ source: "", amount: "" }]);

  const [newSource, setNewSource] = useState({ source: "", amount: "" });
  const [editSource, setEditSource] = useState({
    _id: "",
    source: "",
    amount: "",
  });

  const handleAddSource = async() => {
    console.log("Adding new source" + newSource)
    try{
      const response = await axios.post("/api/sources/addsources",newSource)
      console.log("Add source success",response.data);
    }catch(error){
      console.log(error)
    }
  };


  const handleDeleteSource = async (index) => {
    console.log("here"+index)
     const sourceToDelete = sources[index];
      console.log(sourceToDelete._id);

      try{
        const response = await axios.delete("/api/sources/deletesources/", { data: { id: sourceToDelete._id } });   
        console.log("source Deleted Success"+response)
        const updatedSources = sources.filter((_, i) => i !== index);  // Remove the deleted category from the list
    setSources(updatedSources); 
        
      }catch(error){
        console.log(error)
      }
    };
  
  const handleStartEdit = (index) => {
     const sourceToEdit = sources[index];
     setEditSource({ ...sourceToEdit });
  };
  const handleSaveEdit = async (index) => {
    const sourceToEdit = sources[index];
    console.log("Editing source: ", sourceToEdit);

    try {
        const response = await axios.put("/api/sources/editsources", {
            id: sourceToEdit._id,
            source: editSource.source,
            amount: editSource.amount,
        });
        
        console.log("Edit source success: ", response.data);
        
        const updatedSources = [...sources];
        const editedIndex = updatedSources.findIndex(source => source._id === sourceToEdit._id);
        if (editedIndex !== -1) {
            updatedSources[editedIndex] = { ...updatedSources[editedIndex], ...response.data.updatedSource };
            setSources(updatedSources);
            setEditSource({ _id: "", source: "", amount: "" }); // Reset the edit state
        }
    } catch (error) {
        console.error("Error editing source: ", error);
    }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/sources/getallsources");
        console.log("response", response.data.response);
        setSources(response.data.response)
      } catch (error) {
        console.log(error + "after getting all sources");
      }
    };
    fetchData();
  },[]);

  return (
    <>
      <ScrollArea className="border rounded-lg">
        <Table>
          <TableCaption>
            A list of all the sources
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead>Amount</TableHead>
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
                          placeholder="Source"
                          value={newSource.source}
                          onChange={(e) =>
                            setNewSource({
                              ...newSource,
                              source: e.target.value,
                            })
                          }
                        />
                      </CardContent>
                      <CardContent>
                        <Input
                          placeholder="Amount"
                          value={newSource.amount}
                          onChange={(e) =>
                            setNewSource({
                              ...newSource,
                              amount: e.target.value,
                            })
                          }
                        />
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleAddSource}>Save</Button>
                      </CardFooter>
                    </Card>
                  </PopoverContent>
                </Popover>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sources.map((source, index) => (
              <TableRow key={index}>
                <TableCell>{source.source}</TableCell>
                <TableCell >{source.amount}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger onClick={() => handleStartEdit(index)}>
                      Edit
                    </PopoverTrigger>
                    <PopoverContent>
                      <Card >
                        <CardHeader>
                          <CardTitle>Edit</CardTitle>
                          <CardDescription>
                            Click on Save after Changes
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Input
                            placeholder="Source"
                            value={editSource.source}
                            onChange={(e) =>
                              setEditSource({
                                ...editSource,
                                source: e.target.value,
                              })
                            }
                          />
                        </CardContent>
                        <CardContent>
                          <Input
                            placeholder="Amount"
                            value={editSource.amount}
                            onChange={(e) =>
                              setEditSource({
                                ...editSource,
                                amount: e.target.value,
                              })
                            }
                          />
                        </CardContent>
                        <CardFooter>
                          <Button onClick={() => handleSaveEdit(index)}>Save</Button>
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
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                        <Button onClick={() => handleDeleteSource(index)}>
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
    </>
  );
}
export default Source;
