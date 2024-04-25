import {Trash2, Settings, Image, BookCopy} from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {Link} from "react-router-dom";

const FetchedUploadedImage = ({index, imageUrl}) => {
  return (
    <div
      key={index}
      className="relative overflow-hidden rounded-md shadow-md transition-transform transform hover:scale-105"
    >
      <Dialog>
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
              <Link to={imageUrl} target="_blank">
                View
              </Link>
            </ContextMenuItem>
            <ContextMenuSeparator />

            <ContextMenuItem className="font-montserrat text-purple-500 font-semibold text-xs">
              <Trash2 className="mr-3 md:h-4 md:w-4 h-3 w-4" />

              <DialogTrigger>
                <span>Delete</span>
              </DialogTrigger>
            </ContextMenuItem>
            <ContextMenuSeparator />

            <ContextMenuItem className="font-montserrat text-purple-500 font-semibold text-xs">
              <Settings className="mr-3 md:h-4 md:w-4 h-3 w-4" />
              <span>IPFS Hash</span>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        <DialogContent className="md:max-w-[500px] xs:max-w-[350px] font-montserrat bg-white text-purple-500 md:py-5 md:px-7 p-5 md:pb-0 rounded-sm flex flex-col items-center">
          <DialogHeader className="w-full">
            <DialogTitle className="pb-3 font-normal text-center">
              Share your photos with ease
            </DialogTitle>
            <DialogDescription>
              <Input
                type="email"
                placeholder="Email"
                value={imageUrl}
                className="bg-purple-100 text-xs md:text-base w-full"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="bg-purple-500 hover:bg-purple-300 text-white font-montserrat py-2 px-4 rounded-md text-xs md:text-sm">
              Copy URL
            </Button>
          </DialogFooter>
          <DialogClose asChild={false}></DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FetchedUploadedImage;
