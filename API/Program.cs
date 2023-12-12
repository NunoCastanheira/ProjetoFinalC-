using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProjetoFinalC_.Data;
using ProjetoFinalC_.Entities;
using ProjetoFinalC_.Services;
using ProjetoFinalC_.Services.Interfaces;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IGenericService<Client>, GenericService<Client>>();
builder.Services.AddScoped<IGenericService<Product>, GenericService<Product>>();
builder.Services.AddScoped<IGenericService<Sale>, GenericService<Sale>>();
builder.Services.AddScoped<IGenericService<SaleProduct>, GenericService<SaleProduct>>();
builder.Services.AddScoped<IGenericService<User>, GenericService<User>>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<DataSeederService>();
builder.Services.AddScoped<ITokenService>(provider =>
{
    var configuration = provider.GetRequiredService<IConfiguration>();
    var secretKey = configuration.GetValue<string>("JwtSettings:SecretKey");
    var issuer = configuration.GetValue<string>("JwtSettings:Issuer");
    var audience = configuration.GetValue<string>("JwtSettings:Audience");

    return new TokenService(secretKey, issuer, audience);
});


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddDbContext<Context>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("Local")));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                      });
});

//Authentication
builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
{
    // Oções de indentity
    options.Password.RequiredLength = 8;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<Context>();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Mais oções de indentity
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
    options.Lockout.MaxFailedAccessAttempts = 5;
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var jwtSettings = builder.Configuration.GetSection("JwtSettings");

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]))
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
using (var scope = app.Services.CreateScope())
{
    var dataSeedService = scope.ServiceProvider.GetRequiredService<DataSeederService>();
    await dataSeedService.SeedData();
}

app.UseHttpsRedirection();
app.UseCors("_myAllowSpecificOrigins");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
