using Microsoft.Build.Framework;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAPI.Models
{
    public class Category
    {
        [Key]
        public int categoryId { get; set; }
        
        public string name { get; set; }

    }
}
