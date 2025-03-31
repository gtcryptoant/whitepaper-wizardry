
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProjectParameter } from '@/types/project';

interface ParameterEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  parameter: ProjectParameter | null;
  onParameterChange: (field: keyof ProjectParameter, value: string) => void;
  onSave: () => void;
}

const ParameterEditDialog: React.FC<ParameterEditDialogProps> = ({
  isOpen,
  onOpenChange,
  parameter,
  onParameterChange,
  onSave
}) => {
  if (!parameter) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-earth-800 border-earth-700 text-vanilla-50">
        <DialogHeader>
          <DialogTitle className="text-vanilla-50">Edit Parameter</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-vanilla-200">Name</Label>
            <Input
              id="name"
              value={parameter.name}
              onChange={(e) => onParameterChange('name', e.target.value)}
              className="bg-earth-700 border-earth-600 text-vanilla-50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-vanilla-200">Description</Label>
            <Textarea
              id="description"
              value={parameter.description}
              onChange={(e) => onParameterChange('description', e.target.value)}
              className="bg-earth-700 border-earth-600 text-vanilla-50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value" className="text-vanilla-200">Value</Label>
            <Input
              id="value"
              value={parameter.value}
              onChange={(e) => onParameterChange('value', e.target.value)}
              className="bg-earth-700 border-earth-600 text-vanilla-50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category" className="text-vanilla-200">Category</Label>
            <Select
              value={parameter.category}
              onValueChange={(value) => onParameterChange('category', value as ProjectParameter['category'])}
            >
              <SelectTrigger className="bg-earth-700 border-earth-600 text-vanilla-50">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-earth-700 border-earth-600 text-vanilla-50">
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="agricultural">Agricultural</SelectItem>
                <SelectItem value="governance">Governance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-vanilla-400 text-vanilla-50 hover:bg-vanilla-500 hover:text-earth-900"
          >
            Cancel
          </Button>
          <Button 
            onClick={onSave}
            className="bg-cardano-500 hover:bg-cardano-600 text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ParameterEditDialog;
