import parse from "html-react-parser";

export function parseTextWithLinks(text?: string) {
  if (!text) return "";
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return parse(
    text.replace(urlRegex, function (url) {
      return (
        '<a className="hover:underline text-sky-500" href="' +
        url +
        '">' +
        url +
        "</a>"
      );
    })
  );
}
