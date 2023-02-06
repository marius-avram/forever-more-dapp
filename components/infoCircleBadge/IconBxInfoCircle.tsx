// icon:bx-info-circle | Boxicons https://boxicons.com/ | Atisa
import * as React from "react";

function IconBxInfoCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span style={{cursor: "pointer"}}>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="0.7em"
        width="0.7em"
        {...props}
      >
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
        <path d="M11 11h2v6h-2zm0-4h2v2h-2z" />
      </svg>
    </span>
  );
}

export default IconBxInfoCircle;
