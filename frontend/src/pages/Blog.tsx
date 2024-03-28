import { BlogComponent } from "../components/BlogComponent";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

export function Blog() {
  const id = useParams()
  const { loading, blog } = useBlog({
    id: id || " "
  });
  if (loading) {
    <div>
      Loading...
    </div>
  }
  return (
    <div>
      <BlogComponent/>
    </div>
  )
}