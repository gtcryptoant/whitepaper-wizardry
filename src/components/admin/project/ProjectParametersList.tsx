
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ProjectParameter } from '@/types/project';
import { Edit, Trash } from 'lucide-react';

interface ProjectParametersListProps {
  parameters: ProjectParameter[];
  onUpdate: (parameter: ProjectParameter) => void;
}

const ProjectParametersList: React.FC<ProjectParametersListProps> = ({ 
  parameters,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingParameter, setEditingParameter] = useState<ProjectParameter | null>(null);

  const handleEditStart = (parameter: ProjectParameter) => {
    setEditingParameter({...parameter});
    setIsEditing(true);
  };

  const handleEditSave = () => {
    if (editingParameter) {
      // Update the lastUpdated field
      const updatedParameter = {
        ...editingParameter,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      onUpdate(updatedParameter);
      setIsEditing(false);
      setEditingParameter(null);
    }
  };

  const handleInputChange = (field: keyof ProjectParameter, value: string) => {
    if (editingParameter) {
      setEditingParameter({
        ...editingParameter,
        [field]: value
      });
    }
  };

  const getCategoryColor = (category: ProjectParameter['category']) => {
    switch (category) {
      case 'financial':
        return 'bg-cardano-500 text-white';
      case 'operational':
        return 'bg-nature-500 text-white';
      case 'technical':
        return 'bg-taino-500 text-earth-900';
      default:
        return 'bg-vanilla-300 text-earth-900';
    }
  };

  return (
    <>
      <div className="rounded-md border border-earth-600 overflow-hidden">
        <Table>
          <TableHeader className="bg-earth-600">
            <TableRow className="hover:bg-earth-600/80">
              <TableHead className="text-vanilla-100 font-semibold">Name</TableHead>
              <TableHead className="text-vanilla-100 font-semibold">Value</TableHead>
              <TableHead className="text-vanilla-100 font-semibold">Category</TableHead>
              <TableHead className="text-vanilla-100 font-semibold">Last Updated</TableHead>
              <TableHead className="text-vanilla-100 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-earth-700/50">
            {parameters.map((parameter) => (
              <TableRow key={parameter.id} className="hover:bg-earth-600/30 border-earth-600">
                <TableCell className="font-medium text-vanilla-100">
                  <div>
                    {parameter.name}
                    <p className="text-xs text-vanilla-300 mt-1">{parameter.description}</p>
                  </div>
                </TableCell>
                <TableCell className="font-bold text-cardano-400">{parameter.value}</TableCell>
                <TableCell>
                  <Badge className={getCategoryColor(parameter.category)}>
                    {parameter.category.charAt(0).toUpperCase() + parameter.category.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-vanilla-300">{parameter.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-vanilla-200 hover:text-vanilla-50 hover:bg-earth-600"
                      onClick={() => handleEditStart(parameter)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-vanilla-200 hover:text-vanilla-50 hover:bg-earth-600"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-earth-800 border-earth-700 text-vanilla-50">
          <DialogHeader>
            <DialogTitle className="text-vanilla-50">Edit Parameter</DialogTitle>
          </DialogHeader>
          {editingParameter && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-vanilla-200">Name</Label>
                <Input
                  id="name"
                  value={editingParameter.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-earth-700 border-earth-600 text-vanilla-50"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-vanilla-200">Description</Label>
                <Textarea
                  id="description"
                  value={editingParameter.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-earth-700 border-earth-600 text-vanilla-50"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value" className="text-vanilla-200">Value</Label>
                <Input
                  id="value"
                  value={editingParameter.value}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  className="bg-earth-700 border-earth-600 text-vanilla-50"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-vanilla-200">Category</Label>
                <Select
                  value={editingParameter.category}
                  onValueChange={(value) => handleInputChange('category', value as ProjectParameter['category'])}
                >
                  <SelectTrigger className="bg-earth-700 border-earth-600 text-vanilla-50">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-earth-700 border-earth-600 text-vanilla-50">
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
              className="border-vanilla-400 text-vanilla-50 hover:bg-vanilla-500 hover:text-earth-900"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleEditSave}
              className="bg-cardano-500 hover:bg-cardano-600 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectParametersList;
