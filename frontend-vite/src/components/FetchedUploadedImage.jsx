import {Trash2, Settings, Image} from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const FetchedUploadedImage = ({index, imageUrl}) => {
  return (
    <div
      key={index}
      className="relative overflow-hidden rounded-md shadow-md transition-transform transform hover:scale-105"
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <img
            src={imageUrl}
            alt="Description of the image"
            className="w-full h-30 object-cover object-center"
          />
        </ContextMenuTrigger>
        <ContextMenuContent className="w-53">
          <ContextMenuItem className="font-montserrat text-purple-500 font-semibold text-xs">
            <Image className="mr-3 md:h-4 md:w-4 h-3 w-4" />
            <span>View</span>
          </ContextMenuItem>
          <ContextMenuSeparator />

          <ContextMenuItem className="font-montserrat text-purple-500 font-semibold text-xs">
            <Trash2 className="mr-3 md:h-4 md:w-4 h-3 w-4" />
            <span>Delete</span>
          </ContextMenuItem>
          <ContextMenuSeparator />

          <ContextMenuItem className="font-montserrat text-purple-500 font-semibold text-xs">
            <Settings className="mr-3 md:h-4 md:w-4 h-3 w-4" />
            <span>IPFS Hash</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default FetchedUploadedImage;
