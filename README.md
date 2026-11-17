# Classic Mit-Man Holdings Ltd — Super Final Website

A modern responsive React + Vite website with **six different pages**:

1. Home — welcome and editorial introduction only
2. Our Menu — 5 selectable Kenyan-inspired food categories, with sample dish descriptions
3. Institutions — potential hospital, school and corporate catering arrangements
4. Our Flair — four enhanced gallery concepts with accessible lightbox
5. Contact — all email/phone details and the enquiry form (no duplicated contacts)
6. Ownership — founders and company founding history, only here and last

## Windows setup

1. Extract the complete ZIP into a new folder (avoid reusing older project folders).
2. Open the folder in VS Code.
3. Run `npm install` in the folder containing `package.json`.
4. Run `npm run dev` and open the exact Local URL shown (typically http://localhost:5173).
5. For a production build, run `npm run build`. For production hosting, the existing `npm start` server is available after build.

## Content notes

- The **menu is a proposed illustrative menu**. No invented live prices; confirm availability, portions, dietary options and final quotations with the business.
- The **Institutions** page describes suitable service arrangements, **not verified existing hospital/school/corporate client relationships**.
- The **Our Flair** page uses four AI-enhanced illustrative gallery concepts, not documentary photos of current premises.
- The enquiry form opens a prefilled email in the visitor's email application; it is not a mail-sending backend.
- Contact information appears exclusively on Contact. Company founder story and names appear exclusively on Ownership.

## Technical notes

- React 18, Vite 5, Lucide icons, custom responsive CSS (mobile menu, grid breakpoints, menu category controls).
- Direct navigation to `/menu`, `/institutions`, `/flair`, `/contact`, `/ownership` needs SPA fallback configured on deployment. The bundled Node server supports this.
- All images are bundled in `public/images`.
