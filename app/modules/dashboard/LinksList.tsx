import { EditIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useDashboard } from "~/providers/DashboardProvider";
import DeleteLink from "./DeleteLink";

export default function DashboardLinksList() {
  const { linksQuery } = useDashboard();

  return (
    <div>
      {linksQuery.isLoading && <div>Loading...</div>}
      {linksQuery.isError && <div>Error loading links</div>}
      {linksQuery.isSuccess && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {linksQuery.data?.documents.map((link) => (
            <Card key={link.$id} className="group relative">
              <div className="absolute top-2 right-2 hidden group-hover:block group-focus:block">
                <div className="space-x-2">
                  <Button className="text-sm h-auto py-1 space-x-1 px-2">
                    <EditIcon className="h-4 w-4" />
                    <span>Edit</span>
                  </Button>

                  <DeleteLink linkTitle={link.urlTitle} id={link.$id} />
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg inline-flex space-x-2">
                  {link.urlFavicon ? (
                    <img
                      src={new URL(link.urlFavicon, link.urlLink).toString()}
                      alt="favicon"
                      className="h-6 w-6 rounded-full"
                    />
                  ) : null}

                  <span className="truncate">{link.urlTitle}</span>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {link.urlDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div>
                  <a
                    href={link.urlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm break-all"
                  >
                    {link.urlLink}
                  </a>
                </div>

                <div className="">
                  {link.category ? (
                    <Badge>{link.category}</Badge>
                  ) : (
                    <Badge variant={"outline"}>Uncategorized</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
