using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Models
{
    public class PaymentMethod
    {
        [Key]
        public int paymentId { get; set; }
        
        public string name { get; set; }
    }
}
