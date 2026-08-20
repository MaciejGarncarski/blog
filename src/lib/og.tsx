import { readFileSync } from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";
import satori from "satori";
import sharp from "sharp";
import { capitalizeFirst, getTitleFontSize } from "@/lib/utils";

function loadFontBuffer(filePath: string): Buffer {
   return readFileSync(filePath);
}

function getFonts() {
   const FONT_BOLD_PATH = path.resolve("src/assets/fonts/Montserrat-Bold.ttf");
   const FONT_MEDIUM_PATH = path.resolve("src/assets/fonts/Montserrat-Medium.ttf");
   return [
      {
         name: "Montserrat" as const,
         data: loadFontBuffer(FONT_BOLD_PATH),
         weight: 700 as const,
         style: "normal" as const,
      },
      {
         name: "Montserrat" as const,
         data: loadFontBuffer(FONT_MEDIUM_PATH),
         weight: 500 as const,
         style: "normal" as const,
      },
   ];
}

const TITLE_CHAR_LIMIT = 110;
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const TEXT_COLOR = "#f5f8fc";
const ACCENT_COLOR = "#6397ee";
const FONT_FAMILY = "Montserrat";

const LOGO_SVG = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="favicon-svg-path" d="M172.933 251L249.387 99.001H322.914L223.427 297.325L191.591 357.489H152.908L94.6572 248.27V412.1H0V99.001H94.6572L172.933 251ZM412.791 99C449.198 99.0001 478.172 105.962 499.713 119.887L486.06 188.205C466.946 180.373 447.074 176.456 426.444 176.456C401.567 176.456 381.998 183.564 367.738 197.778C353.479 211.993 346.349 231.72 346.349 256.958C346.349 282.487 352.721 302.358 365.463 316.573C378.508 330.788 395.043 337.895 415.066 337.896C422.348 337.895 428.416 337.316 433.271 336.155V261.745L512 253.042V389.243C494.707 396.786 477.11 402.443 459.21 406.214C441.31 409.985 423.865 411.87 406.875 411.87C374.109 411.87 345.59 405.488 321.319 392.724C297.352 379.959 278.693 362.263 265.344 339.636C264.927 338.929 264.516 338.219 264.112 337.506L382.9 101.013C392.469 99.6713 402.433 99 412.791 99Z" fill="#ffffff" />
</svg>
`;

const LOGO_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString("base64")}`;

function createOgResponse(element: ReactElement) {
   return satori(element, {
      fonts: getFonts(),
      width: OG_WIDTH,
      height: OG_HEIGHT,
   }).then((svg) => sharp(Buffer.from(svg)).png().toBuffer());
}

export async function generateWebsiteOgImage() {
   return createOgResponse(
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: OG_WIDTH,
            height: OG_HEIGHT,
            color: "white",
            fontFamily: FONT_FAMILY,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
         }}
      >
         <GradientBackground />
         <div
            style={{
               position: "absolute",
               top: 0,
               left: "15%",
               right: "15%",
               height: 3,
               backgroundImage: `linear-gradient(to right, transparent, rgba(99, 151, 238, 0.5), transparent)`,
            }}
         />
         <div
            style={{
               position: "absolute",
               bottom: 0,
               left: "25%",
               right: "25%",
               height: 3,
               backgroundImage: `linear-gradient(to right, transparent, rgba(99, 151, 238, 0.3), transparent)`,
            }}
         />

         <img
            src={LOGO_DATA_URI}
            width={150}
            height={150}
            alt=""
            style={{ borderRadius: 8, display: "flex" }}
         />

         <span
            style={{
               display: "flex",
               fontSize: 64,
               fontWeight: 700,
               lineHeight: 1.15,
               color: TEXT_COLOR,
               letterSpacing: "-0.02em",
            }}
         >
            Maciej Garncarski
         </span>

         <span
            style={{
               display: "flex",
               fontSize: 24,
               fontWeight: 500,
               color: ACCENT_COLOR,
               letterSpacing: "0.18em",
               textTransform: "uppercase",
            }}
         >
            Software Engineer
         </span>
      </div>,
   );
}

type OgImage = {
   title: string;
   date: Date;
   tags: string[];
};

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
   month: "long",
   year: "numeric",
});

export async function generateBlogOGImage({ title, date, tags }: OgImage) {
   const formattedDate = capitalizeFirst(dateFormatter.format(date));
   const titleFontSize = getTitleFontSize(title.length);
   const adjustedTitle =
      title.length > TITLE_CHAR_LIMIT ? `${title.slice(0, TITLE_CHAR_LIMIT)}...` : title;

   return createOgResponse(
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: OG_WIDTH,
            height: OG_HEIGHT,
            color: "white",
            fontFamily: FONT_FAMILY,
            overflow: "visible",
            padding: "54px 70px 54px 70px",
            justifyContent: "space-between",
         }}
      >
         <GradientBackground />
         <div
            style={{
               position: "absolute",
               top: 0,
               left: "15%",
               right: "15%",
               height: 3,
               backgroundImage: `linear-gradient(to right, transparent, rgba(99, 151, 238, 0.5), transparent)`,
            }}
         />
         <div
            style={{
               position: "absolute",
               bottom: 0,
               left: "25%",
               right: "25%",
               height: 3,
               backgroundImage: `linear-gradient(to right, transparent, rgba(99, 151, 238, 0.3), transparent)`,
            }}
         />

         <div
            style={{
               display: "flex",
               flexDirection: "row",
               flexWrap: "wrap",
               gap: 12,
            }}
         >
            {tags.map((tag) => (
               <span
                  key={tag}
                  style={{
                     display: "flex",
                     fontSize: 22,
                     color: "rgba(220, 229, 242, 0.9)",
                     backgroundColor: "rgba(99, 151, 238, 0.15)",
                     border: "1px solid rgba(99, 151, 238, 0.1)",
                     borderRadius: 999,
                     padding: "6px 18px",
                  }}
               >
                  {tag}
               </span>
            ))}
         </div>

         <div
            style={{
               display: "flex",
               flex: 1,
               paddingTop: 40,
               paddingBottom: 20,
               alignItems: "flex-start",
            }}
         >
            <span
               style={{
                  fontSize: titleFontSize,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: TEXT_COLOR,
                  textWrap: "balance",
               }}
            >
               {adjustedTitle}
            </span>
         </div>

         <div
            style={{
               display: "flex",
               flexDirection: "row",
               alignItems: "center",
               gap: 32,
            }}
         >
            <img
               src={LOGO_DATA_URI}
               width={60}
               height={60}
               alt=""
               style={{ borderRadius: 8, display: "flex" }}
            />
            <span
               style={{
                  display: "flex",
                  fontSize: 26,
                  color: "rgba(220, 229, 242, 0.9)",
               }}
            >
               {formattedDate}
            </span>
         </div>
      </div>,
   );
}

export async function generateJournalOg({ title, date }: OgImage) {
   const formattedDate = capitalizeFirst(dateFormatter.format(date));
   const titleFontSize = getTitleFontSize(title.length);
   const adjustedTitle =
      title.length > TITLE_CHAR_LIMIT ? `${title.slice(0, TITLE_CHAR_LIMIT)}...` : title;

   return createOgResponse(
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: OG_WIDTH,
            height: OG_HEIGHT,
            color: "white",
            fontFamily: FONT_FAMILY,
            overflow: "visible",
            padding: "54px 70px 54px 70px",
            justifyContent: "space-between",
         }}
      >
         <GradientBackground />
         <div
            style={{
               position: "absolute",
               top: 0,
               left: "15%",
               right: "15%",
               height: 3,
               backgroundImage: `linear-gradient(to right, transparent, rgba(99, 151, 238, 0.5), transparent)`,
            }}
         />
         <div
            style={{
               position: "absolute",
               bottom: 0,
               left: "25%",
               right: "25%",
               height: 3,
               backgroundImage: `linear-gradient(to right, transparent, rgba(99, 151, 238, 0.3), transparent)`,
            }}
         />

         <div
            style={{
               display: "flex",
               flexDirection: "row",
               flexWrap: "wrap",
               gap: 12,
            }}
         >
            <span
               style={{
                  display: "flex",
                  fontSize: 22,
                  color: "rgba(220, 229, 242, 0.9)",
                  backgroundColor: "rgba(99, 151, 238, 0.15)",
                  border: "1px solid rgba(99, 151, 238, 0.1)",
                  borderRadius: 999,
                  padding: "6px 18px",
               }}
            >
               Dzienniki
            </span>
         </div>

         <div
            style={{
               display: "flex",
               flex: 1,
               paddingTop: 40,
               paddingBottom: 20,
               alignItems: "flex-start",
            }}
         >
            <span
               style={{
                  fontSize: titleFontSize,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: TEXT_COLOR,
                  textWrap: "balance",
               }}
            >
               {adjustedTitle}
            </span>
         </div>

         <div
            style={{
               display: "flex",
               flexDirection: "row",
               alignItems: "center",
               gap: 32,
            }}
         >
            <img
               src={LOGO_DATA_URI}
               width={60}
               height={60}
               alt=""
               style={{ borderRadius: 8, display: "flex" }}
            />
            <span
               style={{
                  display: "flex",
                  fontSize: 26,
                  color: "rgba(220, 229, 242, 0.9)",
               }}
            >
               {formattedDate}
            </span>
         </div>
      </div>,
   );
}

function GradientBackground() {
   return (
      <div
         style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: `linear-gradient(135deg, #12141c 0%, #12141c 50%, #1e2a4a 100%)`,
         }}
      />
   );
}
