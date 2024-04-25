import React from "react";
import IndiaGateImage from "../assets/india-gate-night.jpg";

import {Trash2, Settings, Image} from "lucide-react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const TestingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center font-montserrat p-8 h-[80vh]">
      <div className="relative rounded-md shadow-md transition-transform transform hover:scale-105 w-1/2">
        <ContextMenu>
          <ContextMenuTrigger>
            <img
              src={IndiaGateImage}
              alt="Description of the image"
              className="w-full h-auto object-cover object-center rounded-md"
            />
          </ContextMenuTrigger>
          <ContextMenuContent className="w-55">
            <ContextMenuItem className="font-montserrat text-purple-500 font-semibold">
              <Image className="mr-3 h-4 w-4" />
              <span>View</span>
            </ContextMenuItem>
            <ContextMenuSeparator />

            <ContextMenuItem className="font-montserrat text-purple-500 font-semibold">
              <Trash2 className="mr-3 h-4 w-4" />
              <span>Delete</span>
            </ContextMenuItem>
            <ContextMenuSeparator />

            <ContextMenuItem className="font-montserrat text-purple-500 font-semibold">
              <Settings className="mr-3 h-4 w-4" />
              <span>IPFS Hash</span>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  );
};

export default TestingPage;
