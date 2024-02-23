
namespace IndustrialFeedback
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //builder.Services.AddDbContext<IndustrialFeedback.Models.industrial_productsContext>();
            builder.Services.AddCors(p => p.AddPolicy("corspolisy", build =>
            {
                build.WithOrigins("http://localhost:3000").AllowAnyHeader();
            }));

            var app = builder.Build();

            app.UseCors("corspolisy");


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
