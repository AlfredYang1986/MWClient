using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MWWebPage.Controllers.Models
{
    public class StylePalette
    {
        public List<StylePaletteItems> myItems = new List<StylePaletteItems>();

        public List<StylePaletteItems> getMyItems()
        {
            return myItems;
        }

        public string addItem(int top, int left, int width, int h, int z)
        {
            myItems.Add(new StylePaletteItems
            {
                Top = top,
                Left = left,
                Width = width,
                Height = h,
                ZIndex = z
            });

            return "";
        }
    }

    public class StylePaletteItems
    {
        public int Top { get; set; }
        public int Left { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int ZIndex { get; set; }

    }
}
