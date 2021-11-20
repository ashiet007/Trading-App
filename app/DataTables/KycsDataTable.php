<?php

namespace App\DataTables;

use App\Models\Kyc;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class KycsDataTable extends DataTable
{
    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        return datatables()
            ->eloquent($query)
            ->editColumn('created_at', function ($row) {
                return $row->created_at->format('D, d M Y');
            })
            ->addColumn('action', 'admin.kycs.action');
    }

    /**
     * Get query source of dataTable.
     *
     * @param \App\Models\Kyc $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(Kyc $model)
    {
        return $model->newQuery();
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('kycs-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->orderBy(1);
    }

    /**
     * Get columns.
     *
     * @return array
     */
    protected function getColumns()
    {
        return [
            Column::make('first_name'),
            Column::make('middle_name'),
            Column::make('last_name'),
            Column::make('pan_number'),
            Column::make('document_type'),
            Column::make('document_number'),
            Column::make('status'),
            Column::computed('created_at', 'Submitted At'),
            Column::computed('action')
                ->exportable(false)
                ->printable(false)
                ->width(60)
                ->addClass('text-center'),
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'Kycs_' . date('YmdHis');
    }
}
