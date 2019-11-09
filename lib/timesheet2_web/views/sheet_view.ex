defmodule Timesheet2Web.SheetView do
  use Timesheet2Web, :view
  alias Timesheet2Web.SheetView

  def render("index.json", %{sheets: sheets}) do
    %{data: render_many(sheets, SheetView, "sheet.json")}
  end

  def render("show.json", %{sheet: sheet}) do
    IO.puts("Inside show render")
    IO.inspect sheet
    %{data: render_one(sheet, SheetView, "sheet.json")}
  end

  def render("sheet.json", %{sheet: sheet}) do
    IO.puts("Inside sheet.json view")
    IO.inspect sheet
    %{id: sheet.id,
      date: sheet.date,
      user_id: sheet.user_id,
      user_id: sheet.manager_id,
      hours1: sheet.hours1,
      hours2: sheet.hours2,
      hours3: sheet.hours3,
      hours4: sheet.hours4,
      hours5: sheet.hours5,
      hours6: sheet.hours6,
      hours7: sheet.hours7,
      hours8: sheet.hours8,
      task1Name: (if (sheet.task1 == nil), do: nil, else: sheet.task1.name),
      task2Name: (if (sheet.task2 == nil), do: nil, else: sheet.task2.name),
      task3Name: (if (sheet.task3 == nil), do: nil, else: sheet.task3.name),
      task4Name: (if (sheet.task4 == nil), do: nil, else: sheet.task4.name),
      task5Name: (if (sheet.task5 == nil), do: nil, else: sheet.task5.name),
      task6Name: (if (sheet.task6 == nil), do: nil, else: sheet.task6.name),
      task7Name: (if (sheet.task7 == nil), do: nil, else: sheet.task7.name),
      task8Name: (if (sheet.task8 == nil), do: nil, else: sheet.task8.name),
      # add others
      is_approved: sheet.is_approved}
  end
end
