defmodule Timesheet2Web.SheetController do
  use Timesheet2Web, :controller

  alias Timesheet2.Sheets
  alias Timesheet2.Sheets.Sheet

  action_fallback Timesheet2Web.FallbackController

  plug Timesheet2Web.Plugs.RequireAuth when action in [:create, :update, :delete]


  def index(conn, _params) do
    currentUser = conn.assigns[:current_user]
    if nil != currentUser do
        if !currentUser.is_manager do
          sheets = Sheets.get_sheets_by_user(currentUser.id)
          render(conn, "index.json", sheets: sheets)
        else
          sheets = Sheets.get_sheets_by_manager(currentUser.id)
          render(conn, "index.json", sheets: sheets)
        end
    else
      sheets = Sheets.list_sheets()
      render(conn, "index.json", sheets: sheets)
    end

    #sheets = Sheets.list_sheets()
    #render(conn, "index.json", sheets: sheets)
  end

  def create(conn, %{"sheet" => sheet_params}) do
    sheet_params = setTasks(sheet_params)
    with {:ok, %Sheet{} = sheet} <- Sheets.create_sheet(sheet_params) do
      # load tasks
      #newSheet = loadTasks(sheet)
      #IO.puts("Inside create - newSheet")
      newSheet = Sheets.get_sheet!(sheet.id)
      #IO.inspect newSheet
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.sheet_path(conn, :show, newSheet))
      |> render("show.json", sheet: newSheet)
    end
  end

  def setTasks(attrs) do
    taskList = [{"task1Name", "task1_id"}, {"task2Name", "task2_id"},
      {"task3Name", "task3_id"}, {"task4Name", "task4_id"},
      {"task5Name", "task5_id"}, {"task6Name", "task6_id"},
      {"task7Name", "task7_id"}, {"task8Name", "task8_id"} ]
    newAttrs = Enum.reduce(taskList, attrs, fn {task, id}, acc ->
      if (nil != attrs[task] and "" != attrs[task]) do
        task = Timesheet2.Tasks.get_task_job_code!(attrs[task])
        if nil != task do
          acc = Map.put(acc, id, task.id)
        else
          acc
        end
      else
        acc
      end
    end)
    newAttrs
  end

  def show(conn, %{"id" => id}) do
    sheet = Sheets.get_sheet!(id)
    sheet = loadTasks(sheet)
    render(conn, "show.json", sheet: sheet)
  end

  def loadTasks(sheet) do
    taskList = [{:task1Name, :task1_id}, {:task2Name, :task2_id},
      {:task3Name, :task3_id}, {:task4Name, :task4_id},
      {:task5Name, :task5_id}, {:task6Name, :task6_id},
      {:task7Name, :task7_id}, {:task8Name, :task8_id}]
    newSheet = Enum.reduce(taskList, sheet, fn {taskName, taskId}, acc ->
      if (nil != Map.get(sheet, taskId)) do
        task = Timesheet2.Tasks.get_task!(Map.get(sheet, taskId))
        if nil != task do
          acc = Map.put(acc, taskName, task.job_code)
        else
          acc
        end
      else
        acc
      end
    end)
    newSheet
  end

  def update(conn, %{"id" => id, "sheet" => sheet_params}) do
    IO.puts("Here")
    sheet = Sheets.get_sheet!(id)

    with {:ok, %Sheet{} = sheet} <- Sheets.update_sheet(sheet, sheet_params) do
      render(conn, "show.json", sheet: sheet)
    end
  end

  def delete(conn, %{"id" => id}) do
    sheet = Sheets.get_sheet!(id)

    with {:ok, %Sheet{}} <- Sheets.delete_sheet(sheet) do
      send_resp(conn, :no_content, "")
    end
  end
end
