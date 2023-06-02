using Microsoft.Build.Framework;
using System;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAPI.Models
{
    public class Expense
    {
        [Key]
        public int expenseId { get; set; }  
        public string description { get; set; }
        public float amount { get; set; }
        public string category { get; set; }
        public string paymentmethod { get; set; }
        public DateTime createddate { get; set; }
        public DateTime date { get; set; }


    }
}
