'use client';

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, XIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon, RedditShareButton, RedditIcon} from 'react-share';
import { Share2Icon } from "lucide-react";

const Share = ({ shareUrl, title }: { shareUrl: string, title: string }) => {
  return ( 
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Share2Icon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex justify-evenly">
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <XIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <RedditShareButton url={shareUrl} title={title} windowWidth={660} windowHeight={460}>
          <RedditIcon size={32} round />
        </RedditShareButton>
      </PopoverContent>
    </Popover>
  );
}
 
export default Share;