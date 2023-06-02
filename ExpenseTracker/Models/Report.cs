using ExpenseTrackerAPI.Models;
using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Models
{
    public class Report
    {
        [Key]
        public int reportId { get; set; }
        public DateTime startdate { get; set; }
        public DateTime enddate { get; set; }
        public DateTime createddate { get; set; }
        public int totalexpense { get; set; }
    }
}
