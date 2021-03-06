import React, { Component } from 'react'
import MyModal, { ITableParams } from './MyModal'

export default class index extends Component {

    private showHandle = () => {
        MyModal.setup({
            reRequest: true,
            multi: true,
            onInputChange: console.log,
            onOk: (data: any) => {
                console.log(data);
            },
            onShow: () => {
                console.log(123);
            },
            columns: [{dataIndex: 'id',title: 'ID'},{dataIndex: 'name', title: '标题'}],
            machineData: (data) => {
                return data.map((e: any) => ({ id: e.id, name: e.name + '!' }))
            },
        })
    }

    private loadTreeData = () => {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    console.log('get treedata!');
                    resolve([
                        { key: 'a', title: 'a', disabled: true },
                        { key: 'b', title: 'b' },
                        { key: 'c', title: 'c' },
                        { key: 'd', title: 'd' },
                    ])
                }, 1000)
            } catch (error) {
                reject(error)
            }
        })
    }

    private loadTableData = (params: Partial<ITableParams>) => {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    const { pageNum, pageSize, searchValue, treeSelectKey } = params
                    resolve(Array.from({ length: pageSize }, (_, index: number) => ({
                        id: (pageNum - 1) * pageSize + index + 1,
                        name: `${searchValue}-${treeSelectKey}--${Math.random().toString(36).slice(3)}`,
                    })))
                }, 1000)
            } catch (error) {
                reject(error)
            }
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.showHandle}>click me</button>
                <button onClick={this.showHandle}>click me</button>

                <MyModal loadTreeData={this.loadTreeData} loadTableData={this.loadTableData} />
            </div>
        )
    }
}
