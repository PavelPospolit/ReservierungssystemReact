CREATE DATABASE Reservierungssystem

USE [Reservierungssystem]
GO

/****** Object:  Table [dbo].[Employees]    Script Date: 14.03.2022 09:10:53 ******/


CREATE TABLE [dbo].[Employees](
	[EmployeeID] [int] IDENTITY(1,1) NOT NULL,
	[Emailaddress] [varchar](255) NOT NULL,
	[Employee_Password] [varchar](255) NOT NULL,
 CONSTRAINT [pk_employees] PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [table_employee_emailadress] UNIQUE NONCLUSTERED 
(
	[Emailaddress] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Rooms]    Script Date: 14.03.2022 09:13:01 ******/


CREATE TABLE [dbo].[Rooms](
	[Roomnumber] [int] NOT NULL,
	[Roomdescritpion] [varchar](255) NOT NULL,
	[Roomspecials] [varchar](255) NULL,
	[Roomcapacity] [int] NOT NULL,
 CONSTRAINT [pk_rooms] PRIMARY KEY CLUSTERED 
(
	[Roomnumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Reservations]    Script Date: 14.03.2022 09:13:26 ******/

CREATE TABLE [dbo].[Reservations](
	[ReservationID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[Roomnumber] [int] NOT NULL,
	[Starting_Date] [varchar](255) NOT NULL,
	[Ending_Date] [varchar](255) NOT NULL,
 CONSTRAINT [pk_reservations] PRIMARY KEY CLUSTERED 
(
	[ReservationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Reservations]  WITH NOCHECK ADD  CONSTRAINT [fk_employeeid] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO

ALTER TABLE [dbo].[Reservations] CHECK CONSTRAINT [fk_employeeid]
GO

ALTER TABLE [dbo].[Reservations]  WITH NOCHECK ADD  CONSTRAINT [fk_roomnumber] FOREIGN KEY([Roomnumber])
REFERENCES [dbo].[Rooms] ([Roomnumber])
GO

ALTER TABLE [dbo].[Reservations] CHECK CONSTRAINT [fk_roomnumber]
GO

INSERT INTO Rooms VALUES (1, 'erster', 'erster Testraum', 1)
INSERT INTO Rooms VALUES (2, 'zweiter Testraum', 'Whiteboard; Hell Testraum', 1)
INSERT INTO Rooms VALUES (3, 'dritter Testraum', 'Whiteboard; Beamer', 1)