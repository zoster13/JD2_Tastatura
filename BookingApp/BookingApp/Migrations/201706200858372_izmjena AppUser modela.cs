namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class izmjenaAppUsermodela : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AppUsers", "IsBanned", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AppUsers", "IsBanned");
        }
    }
}
